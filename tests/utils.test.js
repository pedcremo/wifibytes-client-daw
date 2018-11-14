import {get} from '../src/utils';

const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    onload: jest.fn(),
    onerror: jest.fn(),
    status: 200,
    response: JSON.stringify(
        [
            { title: 'test post' },
            { title: 'second test post' }
        ]
    ),
    statusText: 'Server not ready'

};
const oldXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = jest.fn(() => mockXHR);

it('Should retrieve a list of posts from the server when calling get', function(done) {
    const reqPromise =get('posts');
    mockXHR.onload();
    reqPromise.then((posts) => {          
        posts=JSON.parse(posts);
        expect(posts.length).toBe(2);
        expect(posts[0].title).toBe('test post');
        expect(posts[1].title).toBe('second test post');
        done();
    });
});

it('Should retrieve a server error when calling get', function(done) {
    mockXHR.status=400; //Simulate error
    window.XMLHttpRequest = jest.fn(() => mockXHR);
    const reqPromise =get('posts');
    mockXHR.onload();
    reqPromise.catch((posts) => {
        console.log(posts);
        posts=JSON.parse(posts);
        done();
    });
});

