import {
  get, setUserLanguage, getCookie, filterPruneArrayByLang, Utils,
} from '../src/utils';
import {Settings} from '../src/settings';
import english from '../src/i18n/translations';

const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  onload: jest.fn(),
  onerror: jest.fn(),
  status: 200,
  response: JSON.stringify(
      [
        {title: 'test post'},
        {title: 'second test post'},
      ]
  ),
  statusText: 'Server not ready',
};

const testFilter1=[{
  name: 'spanish text',
  lang: 'es',
}, {
  name: 'valencia text',
  lang: 'va',
}, {
  name: 'english text',
  lang: 'en',
}];

const testFilter2=[{
  name: 'blabala1',
  language: 'es',
}, {
  name: 'blabala2',
  language: 'va',
}, {
  name: 'blabala3',
  language: 'en',
}];
let oldXMLHttpRequest;
let languageGetter;

// var userLang = navigator.language || navigator.userLanguage;

beforeEach(() => {
  // mockXHR = createMockXHR();
  // jest.clearAllMocks();
  oldXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = jest.fn(() => mockXHR);
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
});

afterEach(() => {
  window.XMLHttpRequest = oldXMLHttpRequest;
});

test('Should retrieve a list of posts from the server when calling get',
    function(done) {
      const reqPromise =get('posts');
      mockXHR.onload();
      reqPromise.then((posts) => {
        // posts=JSON.parse(posts);
        expect(posts.length).toBe(2);
        expect(posts[0].title).toBe('test post');
        expect(posts[1].title).toBe('second test post');
        done();
      });
    });


describe('2 PTS -> PASS setUserLanguage TESTING', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  });
  test('Step1 -> setUserLanguage when browser locale is catalan behaves right',
      () => {
        languageGetter.mockReturnValue('ca-ES');
        setUserLanguage();
        expect(getCookie('language')).toBe('valencia');
        languageGetter.mockRestore();
      });
  test('Step2 ->  setUserLanguage when browser locale is spanish behaves right',
      () => {
        languageGetter.mockReturnValue('es-ES');
        deleteAllCookies();
        setUserLanguage();
        expect(getCookie('language')).toBe('spanish');
        languageGetter.mockRestore();
      });
  test('Step3 ->  setUserLanguage when browser locale is english behaves right',
      () => {
        languageGetter.mockReturnValue('en-UK');
        deleteAllCookies();
        setUserLanguage();
        expect(getCookie('language')).toBe('english');
        languageGetter.mockRestore();
      });
  test('Step4 ->  setUserLanguage when browser locale is rusian behaves right',
      () => {
        languageGetter.mockReturnValue('ru-RU');
        deleteAllCookies();
        setUserLanguage();
        expect(getCookie('language')).toBe(Settings.defaultLanguage);
        languageGetter.mockRestore();
      });
  test('Step5 ->  setUserLanguage(specific language) behaves right', () => {
    window.location.reload = jest.fn();// Mock location reload
    setUserLanguage('valencia');
    expect(getCookie('language')).toBe('valencia');
    setUserLanguage('spanish');
    expect(getCookie('language')).toBe('spanish');
    setUserLanguage('english');
    expect(getCookie('language')).toBe('english');
  });
});

describe('2 PTS -> PASS IMPROVE filterPruneArrayByLang', ()=>{
  beforeEach(() => {
    jest.clearAllMocks();
    oldXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });
  test('Step1 ->  By defaut Filter by lang property', (done) => {
    mockXHR.response=JSON.stringify(testFilter1);

    setUserLanguage('spanish');
    const reqPromise=get('URL', [filterPruneArrayByLang, 'lang']);

    mockXHR.onload();
    reqPromise.then((response) => {
      expect(response.length).toBe(1);
      expect(response[0].name).toBe('spanish text');
      done();
    });
  });
  test('Step2 ->  By defaut Filter by lang property', (done) => {
    mockXHR.response=JSON.stringify(testFilter2);
    setUserLanguage('valencia');
    const reqPromise=get('URL', [filterPruneArrayByLang, 'language']);

    mockXHR.onload();
    reqPromise.then((response) => {
      expect(response.length).toBe(1);
      expect(response[0].name).toBe('blabala2');
      done();
    });
  });
});

describe('Testing utils functions', () => {
  test('testing check url', () => {
    const url = 'http://www.thisis.atest';
    const urlWrong = 'fail.com';
    const check = Utils.checkURL(url);
    const checkWrong = Utils.checkURL(urlWrong);

    expect(check).toBeTruthy();
    expect(checkWrong).toBe('http://fail.com');
  });

  test('cookies funcs', () => {
    Utils.setCookie('prova', 'test de les utils', 365);
    expect(Utils.getCookie('prova')).toBe('test de les utils');
    Utils.deleteCookie('prova');
    expect(Utils.getCookie('prova')).toBeUndefined();

    expect(Utils.getCookie()).toBeUndefined();
  });

  test('randomAnimation', () => {
    const animation = Utils.randomAnimation();
    expect(animation.length).toBeGreaterThan(0);
  });

  test('translate', () => {
    const translate = Utils.translate('login-acces-password');
    const translate2 = Utils.translate('va-a-fallar');

    expect(translate).toBe('PASSWORD');
    expect(translate2).toBe('va-a-fallar');
  });
});

// describe('Improve filterPruneArrayByLang by passing property name to filter by',
//     ()=>{
//       beforeEach(() => {
//         jest.clearAllMocks();
//         oldXMLHttpRequest = window.XMLHttpRequest;
//         window.XMLHttpRequest = jest.fn(() => mockXHR);
//       });
//       test('Step1 ->  By defaut Filter by lang property', (done) => {
//         mockXHR.response=JSON.stringify(testFilter2);
//         setUserLanguage('valencia');
//         const reqPromise=get('URL', [filterPruneArrayByLang, 'language']);

//         mockXHR.onload();
//         reqPromise.then((response) => {
//           expect(response.length).toBe(1);
//           expect(response[0].name).toBe('blabala2');
//           done();
//         });
//       });
//     });

/**
 * We delete all the cookies by changing the expiration date
*/
function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
