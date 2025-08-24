<script>
  import { isLoggedIn } from "../routes/stores";

  let userName = $state('');

  function handleSubmit() {
    if(userName == '') 
        return 
    isLoggedIn.set(userName)
  }
  
</script>


<div class="login-layout">
    <form onsubmit={handleSubmit}>
        <label for="">Enter your name </label>
        <input
            type="text"
            bind:value={userName}
        />
      <input type="submit" value="save"/>
    </form>   
</div>

<style>
.login-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  form {
    background-color: #0066ff;
    padding: 1rem;
    border-radius: 10px;
    display: grid;
    gap: 0.5rem;
    width: 70%;

    input[type="text"] {
      background-color: white;
      border-radius: 4px;
      border: none;
      padding: 10px;
      color: #0066ff;
    }

    input[type="submit"] {
      cursor: pointer;
    }
  }
}

</style>