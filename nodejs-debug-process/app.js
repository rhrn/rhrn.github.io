const app = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
}

exports.app = app
