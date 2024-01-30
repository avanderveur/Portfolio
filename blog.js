$(document).ready(function() {
    // Use Google Feed API to fetch and display the blog feed
    var feedUrl = 'https://myportfolioblog21.blogspot.com/feeds/posts/default?alt=json-in-script';
    var apiUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feedUrl);

    $.getJSON(apiUrl, function(data) {
        if (data.responseData && data.responseData.feed && data.responseData.feed.entries) {
            parseBlogFeed(data.responseData.feed.entries);
        } else {
            console.error('Error fetching blog feed:', data);
            $('#blog-feed').html('<p>Error loading blog feed.</p>');
        }
    });

    function parseBlogFeed(entries) {
        // Parse the JSON and display blog posts
        entries.forEach(function(entry) {
            var title = entry.title;
            var link = entry.link;
            var publishedDate = new Date(entry.publishedDate);
            var summary = entry.contentSnippet;

            var blogPostHTML = `
                <div class="blog-post">
                    <h3>${title}</h3>
                    <p>Published on: ${publishedDate.toLocaleDateString()}</p>
                    <p>${summary}</p>
                    <a href="${link}" target="_blank">Read more</a>
                </div>
            `;

            $('#blog-feed').append(blogPostHTML);
        });
    }
});
