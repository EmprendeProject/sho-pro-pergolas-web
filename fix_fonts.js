const fs = require('fs');
const glob = require('glob');

glob('src/**/*.css', (err, files) => {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // We only want to modify CSS rules that have font-family: var(--font-primary)
    // AND a font-size that is large (clamp, or >= 1.5rem, etc) or they are known big titles.
    const rules = content.split('}');
    const newRules = rules.map(rule => {
      if (!rule.includes('var(--font-primary)')) return rule;
      
      const isBig = rule.includes('clamp') || rule.includes('rem') && rule.match(/font-size:\s*([2-9]|\d+\.\d+)rem/) && parseFloat(rule.match(/font-size:\s*(\d+\.?\d*)rem/)[1]) >= 1.5 || rule.match(/\.heading-/);
      
      if (isBig || rule.includes('title') || rule.includes('heading')) {
        let newRule = rule.replace(/var\(--font-primary\)/g, 'var(--font-display)');
        // Remove font-weight if it's > 400
        newRule = newRule.replace(/font-weight:\s*(500|600|700|800|900|bold|bolder);/g, 'font-weight: normal;');
        // Remove text-transform uppercase
        newRule = newRule.replace(/text-transform:\s*uppercase;/g, 'text-transform: none;');
        return newRule;
      }
      return rule;
    });
    
    fs.writeFileSync(file, newRules.join('}'));
  });
});
