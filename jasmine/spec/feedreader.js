/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function testUrl(object) {
            it('url is defined and not empty', () => {
                expect(object.url).toBeDefined();
                expect(object.url).not.toBe(null);
                expect(object.url).not.toBe('');
            });
        }


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        function testName(object) {
            it('name is defined and not empty', () => {
                expect(object.name).toBeDefined();
                expect(object.name).not.toBe(null);
                expect(object.name).not.toBe('');
            });
        }

        allFeeds.forEach(v => {
            testUrl(v);
            testName(v);
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        let body,
            menu;

        beforeEach(() => {
            //vanila js
            // body = document.querySelector('body')
            // menu = document.querySelector('.menu-icon-link');
            // Jquery
            body = $('body');
            menu = $('.menu-icon-link');
        });

        it('be hidden', () => {
            //vanilla js
            //expect(body.classList.contains('menu-hidden')).toBe(true);
            // Jquery
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
        
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles class when clicked', () => {
            //vanilla js
            // menu.click();
            // expect(body.classList.contains('menu-hidden')).toBe(false);
            // menu.click();
            // expect(body.classList.contains('menu-hidden')).toBe(true);
            // jquery
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });




    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Inital Entries', () => { 
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        
        beforeEach((done) => {
            loadFeed(0, ()=>{
                done();
            });
        });

        it('have an entry', (done) => {
            
            // Vanilla js - querySelector returns null if it can't find 
            // any nodes for the query
            // expect(document.querySelector('.feed .entry-link')).toBeDefined();
            // expect(document.querySelector('.feed .entry-link')).not.toBe(null);
            //jquery - jquery still returns an empty array which still counts
            // as a defined. So we check the length.
            expect($('.feed .entry-link')).toBeDefined();
            expect($('.feed .entry-link').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
    //     /* TODO: Write a test that ensures when a new feed is loaded
    //      * by the loadFeed function that the content actually changes.
    //      * Remember, loadFeed() is asynchronous.
    //      */
        let firstEntries,
            secondEntries;
        beforeEach((done) => {
            loadFeed(0, ()=>{
                done();
            });
            firstEntries = document.querySelector('.feed').querySelectorAll('.entry-link');
            // console.log(firstEntries);
            loadFeed(1, ()=>{
                done();
            });
            secondEntries = document.querySelector('.feed').querySelectorAll('.entry-link');
            // console.log(secondEntries);
        });

        it('should replace old feed', (done) => {
            expect(firstEntries).not.toBe(secondEntries);
            done();
        });
    });
}());
