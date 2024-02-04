from bottle import get, request, template

##############################

@get("/ex-4")
def _():

    return f"""
        <template
            mix-target="[mix-id='ex_4_btn']"
            mix-position = "replace"
        >
            <div class="flex items-center justify-center p-4 text-neutral-200 bg-neutral-800"
                mix-live-for = "5"
            >
                The button is gone, so will I in 5 seconds
            </div>
        </template>
    
    """











