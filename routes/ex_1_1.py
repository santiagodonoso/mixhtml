from bottle import get, request, template

##############################

@get("/ex-1-1")
def _():
    return """
        <template
        mix-target="[id='ex_1_1_btn']"
        mix-position = "beforebegin"
        >
        <div class="flex items-center justify-center h-12 text-neutral-800 bg-amber-200">
            New item
        </div>
        </template>
    """











