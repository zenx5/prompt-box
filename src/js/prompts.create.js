(async ()=>{

    if( chrome.storage ) {
        document
            .querySelector('#create')
            .addEventListener('click', async function(){
                const { prompts } = await chrome.storage.local.get('prompts')
                const content = document.querySelector('#prompt-content')
                const vars = document.querySelector('#prompt-vars')
                const prompt = {
                    content: content.value,
                    vars: vars.value
                }
                const newPrompts = [...prompts, prompt]
                await chrome.storage.local.set({ prompts: newPrompts })
                content.value = ''
                vars.value = ''
            })
    }

})()