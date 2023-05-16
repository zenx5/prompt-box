(async ()=>{

    if( chrome.storage ) {
        async function render(){
            const { prompts } = await chrome.storage.local.get('prompts')
            console.log( 'in render', prompts )
            const DOMList = document.querySelector('#list')
            while( DOMList.children.length > 0 ) {
                DOMList.removeChild( DOMList.children[0] )
            }
            if ( prompts.length > 0 ) {
                prompts.forEach( prompt => {
                    const element = document.createElement('div')
                    element.setAttribute('class', 'item')
                    element.innerText = prompt.content
                    DOMList.append(element)
                })
            } else {
                const element = document.createElement('i')
                element.setAttribute('class', 'empty')
                element.innerText = '- Empty -'
                DOMList.append(element)
            }
        }
        await render()
        chrome.storage.onChanged.addListener( async (changes, namespace) => {
            for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                console.log( key )
                if( key === 'prompts') {
                    await render()
                }
            }
        })
    }

})()