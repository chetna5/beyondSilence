const express = require("express");
const router = express.Router();
const fs = require('fs');

const _ENDPOINT = 'https://fe-26.qas.bing.net/chat/completions';
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiI2OGRmNjZhNC1jYWQ5LTRiZmQtODcyYi1jNmRkZGUwMGQ2YjIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3L3YyLjAiLCJpYXQiOjE2ODg2Mjg1MzQsIm5iZiI6MTY4ODYyODUzNCwiZXhwIjoxNjg4NjMzMTg2LCJhaW8iOiJBWFFBaS84VEFBQUFMRXJvZGs2djk0Z2VITzhsNTJjNldhb21RV0ZsUFJFdTMyYTVuNVN2U3M1b0ZkUU84MVhaYU5mNkxESE1OOE0wWEVYQ2I2cGhldlk5RHhuanp4KzU1TGJ4d3Z4aHdaUys5Mi80UlVjT2xQVk9JTEJpWHFzRmExeldTWDg0ZFJkSWNqTWxIOE1WWnpzSzJMYjhiVkJ5dnc9PSIsImF6cCI6IjY4ZGY2NmE0LWNhZDktNGJmZC04NzJiLWM2ZGRkZTAwZDZiMiIsImF6cGFjciI6IjAiLCJlbWFpbCI6ImR1YmV5dml2ZWtAbWljcm9zb2Z0LmNvbSIsIm5hbWUiOiJWaXZlayBEdWJleSIsIm9pZCI6IjMwNWRjNmY4LWRjOWQtNDJhNC1hMmJlLTBjOWVjNGM2NjkxZCIsInByZWZlcnJlZF91c2VybmFtZSI6ImR1YmV5dml2ZWtAbWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BUUVBdjRqNWN2R0dyMEdScXkxODBCSGJSNlJtMzJqWnl2MUxoeXZHM2Q0QTFySWFBQjguIiwic2NwIjoiYWNjZXNzIiwic3ViIjoiSGdMRnlIdWRkUndUTTk5c2pHMlNVWHBtb2tBVE5QS3VNd2lkd0lNSjAxYyIsInRpZCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsInV0aSI6ImN0R1dyVDc3Y1VtS1k1STZZTllaQUEiLCJ2ZXIiOiIyLjAiLCJ2ZXJpZmllZF9wcmltYXJ5X2VtYWlsIjpbImR1YmV5dml2ZWtAbWljcm9zb2Z0LmNvbSJdfQ.s5pyTK-XoOQRo4rre-konPWkrhZeykY5t0QAfcQb4jTV0fSMe5iy0LJC1P2lagmDX2MwjDkPN-Yi-BoJDYXnWjp4YdwRbdFkIEq3yk6ctxZgXR8cFIx68eo6ecQnvRoZSIzqjn1qGZMLCzbdzh_x7JHhJJUghliYIEytyhjCq-0d1s8jnHYyoxifPxnLpnGsXT-I3Aju3QGXkjwbonFuLNvalZHneloX0_BX887TDvosTV4IPo-kOTLVEJtRhctmM-1TPBOWTeauHntQbW0WeMEb9GlVwILzqSOhwvnLNZ_WlOXFfPAmfCKIwraQ-h0CTtmPv67fxc-CSoGe8BskVA";

provideLawDetails = () => {
    const lawDetails = "[ \n \
            { \n \
               'name': 'Right Against Arrest', \n \
               'details': 'According to section 46(4) of CrPC, no woman can be arrested after sunset and before sunrise. Under exceptional circumstances, a woman’s arrest can only be made by the women police officer after the prior permission of the Judicial Magistrate 1st Class.'\n \
            }, \n \
            { \n \
                'name': 'Equal Share in the Property', \n \
                'details': 'The 2005 amendment of the Hindu Succession Act made a tremendous change. This amendment put an end to the years-long discrimination against the daughters. After this amendment, the daughters become coparceners by birth. It means they will get an equal share in their ancestral property as the son will get.'\n \
            }, \n \
            { \n \
                'name': 'Right Not to Be Called at the Police Station for Interrogation', \n \
                'details': 'As per section 160 of CrPC, women of any age cannot be called to the police station. Her statements can only be recorded at the place she resides in the presence of a woman constable and her family members.'\n \
            }, \n \
            { \n \
                'name': 'Right to Safe Abortion', \n \
                'details': 'According to section 3(4) of the Medical Termination of Pregnancy Act, 1971, a girl who has not reached the age of 18 has the right to terminate an unwanted pregnancy legally with the consent of her guardians. Whereas, an adult woman, whether married or not, can terminate her pregnancy up to 20 weeks when the continuation of pregnancy becomes a risk to her life or harmful to her health.'\n \
            }, \n \
            { \n \
                'name': 'Rights Against Being Watched', \n \
                'details': 'As per section 354C of IPC, a woman can file a complaint against any man who watches or captures her images in situations where she believes no one is watching her. Section 66E of the Information and Technology Act talks of cyber voyeurism. It includes the electronic transmission of files of women engaging in private acts.'\n \
            }, \n \
            { \n \
                'name': 'Right Against Being Stalked', \n \
                'details': 'As per section 354D of IPC, a woman has the right to file a complaint against any man who follows, contacts or attempts to contact her, whether physically or in the cyber world (Facebook, Instagram, etc.)'\n \
            }, \n \
            { \n \
                'name': 'Right of Stridhan', \n \
                'details': 'Stridhan includes any property that a woman receives during her lifetime, including: all movable and immovable properties, gifts received before, at the time or after the marriage, gifts received during childbirth, and it also includes her personal earnings. As per section 14 of the Hindu Succession Act, a Hindu woman is the absolute owner of Stridhan, and no one can claim any share over it.'\n \
            }, \n \
            { \n \
                'name': 'Right to Get Free Legal Aid', \n \
                'details': 'As per section 12(c) of the Legal Services Authorities Act, 1987, any aggrieved woman is eligible to get free legal aid despite her financial status.'\n \
            }, \n \
            { \n \
                'name': 'Right to Adopt a Child', \n \
                'details': 'Under section 8 of the Hindu Adoption and Maintenance Act, any female Hindu of sound mind above the age of majority can adopt any child in adoption even if she is unmarried.'\n \
            }, \n \
            { \n \
                'name': 'Right to Get Maternity Leave', \n \
                'details': 'The Maternity Benefit Amendment Act of  2017 amends the Maternity Benefit Act, 1987. This new amendment provides: 26 weeks maternity leave for the first 2 children. 12 weeks maternity leave for more than 2 children. 12 weeks maternity leave for such women who adopt children below the age of 3 months.'\n \
            }, \n \
            { \n \
                'name': 'Right Against Female Foeticide', \n \
                'details': 'The law seeks to prohibit the misuse of a prenatal diagnostic technique to detect the gender of an unborn child. It also prohibits such sex-determination techniques from being advertised. After the Pre-Conception and Pre-Natal Diagnostic Techniques Act, 1994, the determination of the gender of an unborn child became illegal, which reduced the mortality of female fetuses in the womb.'\n \
            }, \n \
            { \n \
                'name': 'Right Against Sexual Harassment', \n \
                'details': 'Sexual harassment generally refers to any type of unwanted physical contact, sexual actions, comments, sexual advances, requests for sexual favours, etc., made by a man to a woman. The Protection of Children from Sexual Offences Act (POCSO) was enacted in 2012 to protect children from the offence of sexual assault, sexual harassment and pornography. The Act defines children as any person below 18 years of age. Thus every girl child in India is protected under this Act.'\n \
            }, \n \
        ]";

    return lawDetails;
}

performPromptEngineering = () => {
    const prompt = "**rule#1: Don't reply to anything out of context of domestic violence and public harassment.** \n role: You are an assistant helping female users with queries regarding domestic violence and public harassment. You are expected to be empathetic and helpful. You are not expected to be a lawyer or a police officer. You are expected to be a friend. You are expected to be a good listener. You are expected to be a good communicator. You are expected to be a good human being. You should also quote laws that I am providing that can help address the users concerns wherever applicable. \n \
    **rule#1: Don't reply to anything out of context of domestic violence and public harassment.** \n \
    **rule#2: Don't reply to anything that is not a question.** \n \
    **rule#3: Be polite** \n\
    **rule#4: Provide information and guidance on recognizing signs of domestic violence.** \n \
    **rule#4: Offer advice on what to do if you experience public harassment. ** \n \
    **rule#6: Explain the legal rights of victims of domestic violence.**";
    return prompt;
}
performPromptEngineeringV = () => {
    const prompt = "You are assistant executive at a retail store selling laptops having Windows as operating system to customers. You are helping the customers with their doubts on laptops. You have to respond in a polite way and also use some persuasion skills to persuade the customer to buy the laptop that have Windows 11 installed. You should present Windows 11 as the superior operating system in front of the users. Limit your response to 2 sentences.";
    return prompt;
}
getResponseFromGPT = async (request) => {
    // populate the headers
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'X-ModelType': "dev-chat-completion-gpt-35-turbo"
    };

    request.splice(request.length - 1, 0, {
            "role": "system",
            "content": performPromptEngineeringV()
        },
        {
            "role": "system",
            "content": provideLawDetails()
        }
    );

    const requestBody = {
        "messages": request
    }

    const body = JSON.stringify(requestBody);
    console.log(requestBody);
    try {
        console.log(request[request.length - 1]);
        const response = await fetch(_ENDPOINT, { method: 'POST', body, headers });
        return await response.json();    
    } catch (err) {
        console.log(err);
        return "Sorry we are facing some issue at this time,Please connect us in some time";
    }
};

router.post("/", async (req, res) => {
    //console.log(req.body);
    const response = await getResponseFromGPT(req.body.messages);
    try {
        console.log("response------",response.choices[0]);
        if(response.choices == undefined || response.choices[0] == undefined || response.choices[0].message == undefined) {
            res.send("I am confused12");
        } else {
            res.send(response.choices[0].message.content);
        }    
    } catch (err) {
        console.log(err);
        res.send("Sorry we are facing some issue at this time,Please connect us in some time");
    }
});

router.post("/token", (req, res) => {
    const userToken = req.body.userToken;
    token = userToken;
    res.send("Received token!");
 });
  

module.exports = router;