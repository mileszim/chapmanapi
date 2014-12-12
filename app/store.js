import {Store} from 'fireplace';

window.FBR = new window.Firebase('https://chapmanuniversity.firebaseio.com/');

export default Store.extend({
  firebaseRoot: window.FBR
});
