from bottle import get
import time

##############################

@get("/ex-7")
def _():
    time.sleep(3)
    return f"""
        <template
            mix-target="#ex_7_div"
            mix-position = "beforeend"
        >
            <div class="flex items-center justify-center p-4 text-neutral-200 bg-amber-600">
                A few seconds of waiting. I am here
            </div>
        </template>      
    """











