vcl 4.0;

backend default {
    .host = "127.0.0.1";
    .port = "80";
}

sub vcl_recv {
    # Only cache GET and HEAD requests
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }

    # Don't cache admin <boltAction type="file" filePath="default.vcl">    if (req.url ~ "^/dashboard") {
        return (pass);
    }

    # Don't cache login pages
    if (req.url ~ "^/login") {
        return (pass);
    }

    # Remove cookies for static files
    if (req.url ~ "\.(jpg|jpeg|gif|png|css|js|ico|svg)$") {
        unset req.http.Cookie;
        return (hash);
    }

    return (hash);
}

sub vcl_backend_response {
    # Cache static files
    if (bereq.url ~ "\.(jpg|jpeg|gif|png|css|js|ico|svg)$") {
        set beresp.ttl = 24h;
    }

    # Don't cache if backend says not to
    if (beresp.ttl <= 0s || beresp.http.Cache-Control ~ "private") {
        set beresp.ttl = 0s;
        set beresp.uncacheable = true;
        return (deliver);
    }

    # Default cache time
    set beresp.ttl = 1h;
    return (deliver);
}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
    return (deliver);
}