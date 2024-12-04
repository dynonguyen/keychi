package util

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"golang.org/x/net/html"
)

// FetchFavicon fetches the favicon of a given website URL
func FetchFavicon(website string) ([]byte, error) {
	// Send HTTP GET request
	resp, err := http.Get(website)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch website: %v", err)
	}
	defer resp.Body.Close()

	// Parse the HTML
	doc, err := html.Parse(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to parse HTML: %v", err)
	}

	// Find favicon URL
	var faviconURL string
	var findFavicon func(*html.Node)

	findFavicon = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "link" {
			var rel, href string
			for _, attr := range n.Attr {
				if attr.Key == "rel" {
					rel = attr.Val
				}
				if attr.Key == "href" {
					href = attr.Val
				}
			}
			if strings.Contains(rel, "icon") {
				faviconURL = href
				return
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			findFavicon(c)
		}
	}

	findFavicon(doc)

	// Resolve relative URL if needed
	parsedWebsite, err := url.Parse(website)
	if err != nil {
		return nil, fmt.Errorf("invalid website URL: %v", err)
	}

	parsedFavicon, err := url.Parse(faviconURL)
	if err != nil {
		return nil, fmt.Errorf("invalid favicon URL: %v", err)
	}

	faviconURL = parsedWebsite.ResolveReference(parsedFavicon).String()

	faviconResp, err := http.Get(faviconURL)

	if err != nil {
		return nil, fmt.Errorf("failed to download favicon: %v", err)
	}

	defer faviconResp.Body.Close()

	return io.ReadAll(faviconResp.Body)
}
