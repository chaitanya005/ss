/* import { Client } from "@notionhq/client"




const Notion = () => {
    
    const notion = new Client({ auth: 'secret_nVMXTaXGC6XnMhivTGu5sIK5tnXTIOYIRTfhf23UbMi' })
    
    const databaseId = '746cbc16c13a4c2a959cd6b81033983f'


    async function addItem(text) {
        console.log(text)
        try {
          await notion.request({
            path: "pages",
            method: "POST",
            body: {
              parent: { database_id: databaseId },
              properties: {
                title: { 
                  title:[
                    {
                      "text": {
                        "content": text
                      }
                    }
                  ]
                }
              }
            },
          })
          console.log("Success! Entry added.")
        } catch (error) {
          console.error(error.body)
        }
      }
      
    //   addItem("Yurts in Big Sur, California")


    let text = "Yurts in Big Sur, California"
    return (
        <>
        <h1>Notion Integration</h1>

        <button onClick = {() => addItem(text)} >Fuck Me!!</button>
        </>
    )

}


export default Notion; */

import React from "react";
import axios from "axios";

const Notion = () => {
  const request = () => {
    /* axios.get('/users')
            .then(res => console.log(res))
            .catch(err => console.log(err)) */
    /*    var data = JSON.stringify({"parent":{"database_id":"746cbc16c13a4c2a959cd6b81033983f"},"properties":{"title":{"title":[{"text":{"content":"Yurts in Big Sur, California"}}]}}});

        var config = {
        method: 'post',
        url: '/pages',
        headers: { 
            'Authorization': 'Bearer secret_nVMXTaXGC6XnMhivTGu5sIK5tnXTIOYIRTfhf23UbMi', 
            'Content-Type': 'application/json', 
            'Notion-Version': '2021-05-13'
        },
        data : data
        };
         */
    //https://cors-anywhere.herokuapp.com/

    /* const headers = {
          'Authorization': 'Bearer secret_nVMXTaXGC6XnMhivTGu5sIK5tnXTIOYIRTfhf23UbMi', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Notion-Version': '2021-05-13',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
        } */

    /*  axios.post('https://api.notion.com/v1/pages', {
          body: {
              parent: { database_id: "746cbc16c13a4c2a959cd6b81033983f" },
              properties: {
                title: { 
                  title:[
                    {
                      "text": {
                        "content": "sdkjfnksdfjs"
                      }
                    }
                  ]
                }
              }
          },
            headers: headers
        })
        .then(res => console.log(res))
        .catch(err => console.log(err)) */

    /* axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        }); */

    console.log("calling");

    /*  axios
      .get("https://notion-demo.herokuapp.com/notion")
      .then((res) => console.log(res))
      .catch((err) => console.log(err)); */

    axios
      .post("http://localhost:8000/notion", {
        // method: 'POST',
        body: {},
      })
      .then((response) => console.log(response))
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  const getRequest = () => {
    axios
      .get("https://notion-demo.herokuapp.com/getNotion")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={request}>POST</button>
      <button onClick={getRequest}>GET</button>
    </>
  );
};

// axios.defaults.proxy = 'https://api.notion.com/v1';

export default Notion;
