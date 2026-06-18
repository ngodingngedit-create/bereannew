const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.vue') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // Replace Mocca -> Berean.id
            newContent = newContent.replace(/\bMocca\b/g, 'Berean.id');
            // Replace mocca -> berean.id
            newContent = newContent.replace(/\bmocca\b(?!-)/g, 'berean.id'); // exclude mocca- for css vars
            // Replace MOCCA -> BEREAN.ID
            newContent = newContent.replace(/\bMOCCA\b/g, 'BEREAN.ID');
            
            // Fix specific email
            newContent = newContent.replace(/Moccamerch@gmail.com/gi, 'berean.id@gmail.com');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
            }
        }
    }
}

replaceInFiles(path.join(__dirname, 'src'));
console.log("Replacement done");
