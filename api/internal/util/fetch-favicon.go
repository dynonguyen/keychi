package util

import (
	"io"
	"net/http"
	"strings"

	"golang.org/x/net/html"
)

// Fetches the HTML of a given URL.
func fetchHTML(url string) (*string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	htmlContent := string(body)

	return &htmlContent, nil
}

// Extracts the favicon URL from the HTML.
func extractFaviconURL(htmlContent *string, baseURL string) string {
	doc, err := html.Parse(strings.NewReader(*htmlContent))

	if err != nil {
		return ""
	}

	var faviconURL string
	var parse func(*html.Node)

	parse = func(n *html.Node) {
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
			parse(c)
		}
	}
	parse(doc)

	if faviconURL == "" {
		return ""
	}

	if strings.HasPrefix(faviconURL, "http") {
		return faviconURL
	}

	return baseURL + faviconURL
}

func FetchFavicon(url string) ([]byte, error) {
	htmlContent, err := fetchHTML(url)

	if err != nil {
		return nil, err
	}

	faviconURL := extractFaviconURL(htmlContent, url)
	resp, err := http.Get(faviconURL)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}
