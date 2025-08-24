<script>
  import { messages, userInfoInChanle } from "../routes/stores";
  import {sendMessage} from "../utiles.js"

  let message = $state('')

  async function handleSumit(e) {
    e.preventDefault();
    if (!message || !sendMessage || !$userInfoInChanle ) return;

    sendMessage(message);
    message = "";
  }

</script>

<section class="message-container">
  <div class="messages">
    {#each $messages as message }
    <h3>
      <span>{message.owner} :</span>
      {message.message}
    </h3>
    {/each}
  </div>
  <form onsubmit={handleSumit}>
    <input
      type="text"
      bind:value={message}
    />
    <input type="submit" value="send" />
  </form>
</section>

<style>
.message-container {
  position: absolute;
  padding: 10px;
  width: 100%;
  bottom:6rem;
  left: 0;
  z-index: 1000;

  form {
    display: flex;
    margin-top: 10px;

    input[type="text"] {
      outline: none;
      border: none;
      padding: 5px;
      flex: 2;
    }
    input[type="submit"] {
      padding: 4px 8px;
      background: #0066ff;
      color: white;
      border: none;
      cursor: pointer;
    }
  }

  .messages {
    display: grid;
    max-height: 5rem;
    overflow-y: auto;
    scrollbar-width: none;
    gap: 5px;

    h3 {
      padding: 5px 8px;
      border-radius: 5px;
      background-color: white;
      color: #0066ff;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;

      span {
        display: block;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }

}
</style>