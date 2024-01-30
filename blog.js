$(document).ready(function() {
    // Use jQuery to fetch and display the blog feed
    $.ajax({
        url: 'https://myportfolioblog21.blogspot.com/feeds/posts/default',
        type: 'GET',
        dataType: 'xml',
        success: function(data) {
            parseBlogFeed(data);
        },
        error: function(error) {
            console.error('Error fetching blog feed:', error);
            $('#blog-feed').html('<p>Error loading blog feed.</p>');
        }
    });

    function parseBlogFeed(xml) {
        // Parse the XML and display blog posts
        $(xml).find('entry').each(function() {
            var title = $(this).find('title').text();
            var link = $(this).find('link').attr('href');
            var published = $(this).find('published').text();
            var summary = $(this).find('summary').text();

            var blogPostHTML = `
                <div class="blog-post">
                    <h3>${title}</h3>
                    <p>Published on: ${published}</p>
                    <p>${summary}</p>
                    <a href="${link}" target="_blank">Read more</a>
                </div>
            `;

            $('#blog-feed').append(blogPostHTML);
        });
    }
});
