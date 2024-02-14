from bottle import post, request
import uuid

##############################

@post("/is-email-available")
def _():
    email = request.forms.get('email', "")

    if email == "":
        return f"""
            <template
                mix-target="#ex_6_message""
                mix-replace
            >
            <div id="ex_6_message" class="absolute top-3 right-2">     
                <div class="flex items-center justify-center px-2 text-neutral-200 bg-amber-600 rounded-full">
                    Email cannot be empty
                </div>
            </div>  
            </template>   
            """

    if email == "a@a.com":
        return f"""
            <template
                mix-target="#ex_6_message""
                mix-replace
            >
            <div id="ex_6_message" class="absolute top-3 right-2"> 
                <div class="flex items-center justify-center px-2 text-neutral-200 bg-red-600 rounded-full">
                    Email not available
                </div>
            </div>  
            </template>   
            """
    
    return f"""
        <template
            mix-target="#ex_6_message""
            mix-replace
        >
        <div id="ex_6_message" class="absolute top-3 right-2"> 
            <div class="flex items-center justify-center px-2 text-neutral-200 bg-green-600 rounded-full">
                Email available
            </div>
        </div>  
        </template>      
    """