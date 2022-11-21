const { exec } = require('shelljs')

exec(`yarn build`)
exec(`yarn version --patch`)
exec(`yarn publish --access public`)
