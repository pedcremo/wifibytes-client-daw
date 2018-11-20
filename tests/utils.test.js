import {get} from '../src/utils';

const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    onload: jest.fn(),
    onerror: jest.fn(),
    status: 200,
    response: JSON.stringify(
        [
            { title: "test post" },
            { title: "second test post" }
        ]
    ),
    statusText: "Server not ready"
};
let oldXMLHttpRequest;

beforeEach(() => {
    //mockXHR = createMockXHR();
    oldXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = jest.fn(() => mockXHR);
});

afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
});

test('Should retrieve a list of posts from the server when calling get', function(done) {
    const reqPromise =get('posts');
    mockXHR.onload();
    reqPromise.then((posts) => {          
        //posts=JSON.parse(posts);
        expect(posts.length).toBe(2);
        expect(posts[0].title).toBe('test post');
        expect(posts[1].title).toBe('second test post');
         
        done();
    });
});

/*test("Should retrieve a server error when calling get", function(done) {
    mockXHR.status=400;
    const reqPromise =get("posts");
    
    mockXHR.onload();
    reqPromise.catch((e) => {
        expect(e.message).toBe("Server not ready");
        console.log("arregat"+e.message);
        done();
    });
});*/

