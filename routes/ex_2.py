from bottle import get, request, template

##############################

@get("/ex-2")
def _():
    return """
        <template
        mix-target="[id='ex_2_btn']"
        mix-position = "beforebegin"
        >
            <div class="flex items-center justify-center h-12 text-neutral-800 bg-amber-200">
                This item came from the server. The button is gone :(
            </div>
        </template>

        <template
        mix-target="[id='ex_2_btn']"
        mix-position = "replace"
        >
        </template>        
    """











