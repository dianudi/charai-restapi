# CharacterAI RestAPI

## About this project

> Node.js client for the unofficial [Character AI API](https://character.ai/), an awesome website which brings characters to life with AI!

**This project is not affiliated with Character AI in any way! It is a community project.**
The purpose of this project is to bring and build projects powered by Character AI.

## How to run

```bash
yarn install
yarn knex migrate:latest
yarn start
```

## Usage

Open browser and locate to `http://localhost:3000`

## Using an Access Token

Some parts of the API (like managing a conversation) require you to be logged in using an `accessToken` and an `idToken`.

To get it, you can open your browser, go to the [Character.AI website](https://character.ai) in `localStorage`.

---

### ⚠️ WARNING: DO NOT share your access token and id token to anyone you do not trust or if you do not know what you're doing.

#### _Anyone with your access token and id token could have access to your account without your consent. Do this at your own risk._

---

### On PC:

1. Open the Character.AI website in your browser (https://beta.character.ai)
2. Open the developer tools (<kbd>F12</kbd>, <kbd>Ctrl+Shift+I</kbd>, or <kbd>Cmd+J</kbd>)
3. Go to the `Application` tab
4. Go to the `Storage` section and click on `Local Storage`
5. Look for the `@@auth0spajs@@::dyD3gE281MqgISG7FuIXYhL2WEknqZzv::https://auth0.character.ai/::openid profile email offline_access` key
6. Open the body, copy the access token, store it somewhere and then copy the id token.

![Access_Token](https://github.com/realcoloride/node_characterai/assets/108619637/9c830ed3-a28d-4fc0-8220-44c33bf8bf58)

### On Mobile:

1. Open the Character.AI website in your browser (https://beta.character.ai)
2. Open the URL bar, write `javascript:` (case sensitive) and paste the following:

```javascript
(function () {
  const localStorageKeys = Object.keys(window.localStorage).filter((key) => key.startsWith("@@"));
  if (localStorageKeys.length === 0) {
    alert("You need to log in first!");
    return;
  }
  const storageInformation = JSON.parse(window.localStorage[localStorageKeys[0]]).body;
  const accessToken = storageInformation.access_token;
  const idToken = storageInformation.id_token;
  document.documentElement.innerHTML = `<div><p>Here is your access token:</p><input value="${accessToken}" readonly><p>Here is your id token:</p><input value="${idToken}" readonly><p><strong>Do not share this with anyone unless you know what you are doing! Those are your personal access token and id token. If stolen or requested by someone you don't trust, they could access your account without your consent; if so, please close the page immediately.</strong></p><button id="copy" onclick="navigator.clipboard.writeText('${accessToken}'); alert('Copied to clipboard!')">Copy access token to clipboard</button><button id="copy" onclick="navigator.clipboard.writeText('${idToken}'); alert('Copied to clipboard!')">Copy id token to clipboard</button><button onclick="window.location.reload();">Refresh the page</button></div>`;
  accessToken = null;
  idToken = null;
})();
```

3. The following page should appear:
   ![Access_Token_Mobile](https://github.com/realcoloride/node_characterai/assets/108619637/50181353-0e55-448f-87e9-e4d3b6457319)
4. Click the respective buttons to copy your access token or id token to your clipboard.

## Finding your character's ID

You can find your character ID in the URL of a Character's chat page.

For example, if you go to the chat page of the character `Discord Moderator` you will see the URL `https://beta.character.ai/chat?char=8_1NyR8w1dOXmI1uWaieQcd147hecbdIK7CeEAIrdJw`.

The last part of the URL is the character ID:
![Character_ID](https://i.imgur.com/nd86fN4.png)

## Disclaimer

If you use this API, you also bound to the terms of usage of their website.
