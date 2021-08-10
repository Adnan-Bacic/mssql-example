

class NoteHandler {

    constructor() {
   
       this.allNotesFromDB = document.querySelector("#allNotesFromDB");
       this.btnSendNoteToDB = document.querySelector("#btnSendNoteToDB");
       
       this.getAllNotes();
       this.saveNote();

    }

     saveNote() { 
    
       this.btnSendNoteToDB.addEventListener("click", ()=>{

       let title = document.querySelector("#title").value;
       let text = document.querySelector("#text").value;

       fetch("/savenote", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            title,
            text,
        })
      })
      .then((res) => { 
        return res.json()
      })
      .then((data)=>{
        alert(data.WhatTheFuck);
        this.getAllNotes();
      });
    })
    }

    getAllNotes(){
                    fetch('/getAllNotes')
                    .then((res) => { return res.json()}) //receive a promise, that in a while promises some json data
                    .then((data) => { // here we actually receives the json data
                        
                        this.allNotesFromDB.innerHTML = "";

                        for (let note of data) {
                            let elementLi = document.createElement("li");
                            elementLi.addEventListener("click", () => {
                                this.showNoteInView(note);
                            })
                            elementLi.classList.add("list-group-item");
                            elementLi.innerHTML = note.note_title;
                            //elementLi.innerHTML = note.note_text;
                            this.allNotesFromDB.appendChild(elementLi);
                        } 
                    })
                }   
            }

    

            new NoteHandler();