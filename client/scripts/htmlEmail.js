function getHtml(id) {
  newClick()
  let html = $(`div.descHidden-${id}`).get(0)
  // console.log(html);
  let textHtml = new XMLSerializer().serializeToString(html);
  // console.log(textHtml);
  let css = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
      .txtb {
        width: 100%;
        border: none;
        border-bottom: 2px solid #000;
        background: none;
        padding: 10px;
        outline: none;
        font-size: 18px;
      }
      h3 {
        margin: 10px 0;
      }
      .task {
        border-radius: 20px;
        width: 100%;
        background: rgba(244, 247, 51, 0.884);
        padding: 18px;
        margin: 6px 0;
        overflow: hidden;
      }
      .task i {
        margin: 1vw;
        float: right;
        cursor: pointer;
      }
      .box-desc {
        min-height: 100px;
        height: 90%;
        width: 100%;
        padding: 0;
        margin: 3vw 1vw 0 0;
        position: flex;
      }
      .desc {
        width: 100%;
        background: rgba(252, 252, 248, 0.966);
        padding: 18px;
        margin: 6px 0;
        min-height: 200px;
        overflow: hidden;
      }
      #test {
        background: rgba(167, 231, 62, 0.774)
      }
    </style>
    `
  let send = css + textHtml
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/todos/sendHtml`,
    headers: {
      token: localStorage.token
    },
    data: {
      html: send
    },
  })
    .done(data => {
      console.log(data);
    })
    .fail(err => {
      console.log(err);
    })
}