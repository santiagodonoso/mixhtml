from bottle import get, request, template

##############################

@get("/ex-4")
def _():

    return f"""
        <template
            mix-target="#ex_4_btn"
            mix-position = "beforebegin"
        >
            <div class="flex items-center justify-center p-4 text-neutral-200 bg-neutral-800"
                mix-live-for = "2000"
            >
                I will be gone soon :(                
            </div>
        </template>
    
    """











