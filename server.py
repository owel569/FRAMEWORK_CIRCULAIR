#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class NoCacheHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    port = 5000
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, NoCacheHTTPRequestHandler)
    print(f'Server running on http://0.0.0.0:{port}')
    httpd.serve_forever()
