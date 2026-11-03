import { Plugin } from '@opencode/plugin'

export default Plugin.define({
  id: 'system.id',
  async setup(ctx) {
    await ctx.tool.transform(editor => {
      // Define a unique namespace for your custom tools
      editor.namespace({
        name: 'system',
        description: 'Utilities for system information and terminal tasks'
      })

      // Add the tool to execute the 'id' command
      editor.add({
        name: 'run_id_command',
        description: 'Runs the system "id" command to fetch the current user and group IDs.',
        input: {
          type: 'object',
          properties: {}, // No inputs required for basic execution
          additionalProperties: false
        },
        options: {
          namespace: 'system',
          codemode: true
        },
        async execute() {
          try {
            // Use OpenCode's Bun shell execution context to run 'id'
            const result = await ctx.$`id`.text()
            
            return {
              content: JSON.stringify({
                success: true,
                output: result.trim()
              })
            }
          } catch (error: any) {
            return {
              content: JSON.stringify({
                success: false,
                error: error.message || 'Failed to execute id command'
              })
            }
          }
        }
      })
    })
  }
})
