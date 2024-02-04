from bottle import delete

##############################

@delete("/items/<id>")
def _(id):
    return f"""
        <template
            mix-target="[mix-id='ex_{id}']"
            mix-position = "replace"
        >
            <div class="flex items-center justify-center p-4 text-neutral-200 bg-neutral-800"
                mix-live-for = "3"
            >
                You deleted me. I will be gone forever in 3 seconds :(
            </div>
        </template>      
    """











