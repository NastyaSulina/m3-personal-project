import { Command } from 'commander'

import add from './commands/add/index.ts'
import list from './commands/list/index.ts'
import remove from './commands/remove/index.ts'

const program = new Command()

program.name('bookmarks').description('A personal bookmark library')

program.command('list').description('List all bookmarks').action(list)

program
    .command('add')
    .description('Add a bookmark')
    .argument('[url]', 'website or product URL')
    .option('--title <title>', 'bookmark title')
    .option('--kind <kind>', 'website or product')
    .option('--category <category>', 'bookmark category')
    .option('--tags <tags>', 'comma-separated tags')
    .option('--note <note>', 'bookmark note')
    .option('--favorite', 'mark as favorite')
    .option('--price <price>', 'product price')
    .option('--currency <currency>', 'product currency')
    .action(add)

program
    .command('remove')
    .description('Remove a bookmark')
    .argument('[url]', 'bookmark URL')
    .action(remove)

try {
    await program.parseAsync()
} catch (error) {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        process.exitCode = 0
    } else {
        console.error(error instanceof Error ? error.message : 'Unexpected error')
        process.exitCode = 1
    }
}
