function addComment(author, score, body, back){
  console.log("addComment");
  for (var i = 0; i < back.length; i++){
    if (back[i][0] !== "'"){
      back[i] = "'" + back[i] + "'";
    }
  }
  var html = `<div>
                ${body}
              </div>`
  return parentHTML(author, score, html, "Replies", back);
}

function addParent(author, score, title, back, body){
  console.log("addParent");
  console.log(body);
  for (var i = 0; i < back.length; i++){
    if (back[i][0] !== "'"){
      back[i] = "'" + back[i] + "'";
    }
  }
  var html = `<div>
          <b>${title}</b>
          </div>
          <div>
            ${body}
          </div>`
  return parentHTML(author, score, html, "Back", back);             
}

function addParentWithImage(author, score, title, image_data, body){
  console.log("addParentWithImage");
  var height = image_data[image_data.length - 1].height;
  var width = image_data[image_data.length - 1].width;
  var resized_width = Math.round((512/height) * width);

  var url = image_data[image_data.length - 1].url;
  var html = `<div>
                <b>${title}</b>
                <br>
                ${body}
                <br>
                <a onclick="showImage('${url}', '${resized_width}px', '512px')" id="toggle_image_button" style="cursor:pointer;">Show image</a>
                <br>
                <img id='submission_image' src="">
              </div>`
  return parentHTML(author, score, html, "Back");
  
                              
}

function addParentWithVideo(author, score, title, video_data, body){
  console.log("addParentWithVideo");
  var video_src = video_data.media.reddit_video.fallback_url;
  var audio_src = video_data.url + "/audio";

  var width = video_data.media.reddit_video.width;
  var height = video_data.media.reddit_video.height;
  console.log(video_src, audio_src);
  var html = `<div>
                <b>${title}</b>
                <br>
                ${body}
                <br>
                <a onclick="showVideo('${video_src}', '${audio_src}', ${width}, ${height})" id="toggle_video_button" style="cursor:pointer;">Show video</a>
                <br>
                <div id="submission_video">
                  
                </div>
              </div>`
  return parentHTML(author, score, html, "Back")
                             
}

function parentHTML(author, score, html, back_or_replies, back=[]){
  if (parseInt(score) > 0){
    score = "+" + score;
  }
  return `<div class="vr-item-placeholders" aria-hidden="true">
  <div class="item-wrap ts-message-list-item">
    <div class="clearfix" id="t1578474574843">
      <thread class="ts-expanded-message">
          <div class="ts-message acc-message-list-focusable">
          <div class="conversation-common conversation-start conversation-not-collapsed">
            <thread-body>
              <div class="media thread-body acc-thread-focusable has-hover-actions keep-size-after-like">
                <div class="media-left">
                  <div class="wrapper"></div>
                </div>
                <div class="ts-message-thread-body align-item-left">
                  <div class="message-body message-body-width">
                    <div class="message-body-top-row padded-content">
                      <div class="top-row-text-container">
                        <div class="ts-msg-name app-small-font">
                          ${author}
                        </div>
                        <div class="timestamp-column">
                          <span class="ts-created message-datetime">
                            ${score}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <see-more>
                        <div class="message-body-container padded-content">
                          <div class="message-body-content clearfix html">
                              ${html}
                              <div>
                                <p id="space_maker"></p>
                              </div>
                          </div>
                        </div>
                      </see-more>
                    </div>
                  </div>
                </div>
              </div>
            </thread-body>
          </div>
          <div class="thread-action-reply-message" onclick="showReplies([${back}], true)">
            <reply-message>
              <div class="ts-reply-message">
                <div class="ts-reply-message-footer">
                  <div class="ts-message-action-toolbar">
                    <button type="button" class="ts-sym icons-reply acc-thread-focusable">
                      <svg class="app-svg icons-unfilled icons-default-fill">
                        <use xlink:href="#icons-reply" href="#icons-reply"></use>
                      </svg>
                      <svg class="app-svg icons-filled icons-default-fill">
                        <use xlink:href="#icons-reply-filled" href="#icons-reply-filled"></use>
                      </svg>
                      <span data-tid="replyMessageButtonText">
                        ${back_or_replies}
                      </span>
                      </button>
                  </div>
                </div>
              </div>
            </reply-message>
          </div>
        </div>
      </thread>
    </div>
  </div>
  </div>`
}