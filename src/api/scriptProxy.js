export default async function handler(req, res) {
  const targetUrl =
    'https://script.google.com/macros/s/AKfycbzSxdWR2U7SjJsS4tWlHrHAiASZ1NlfJMHqszlI_oi5TO77jS0jqOJYuAcj2H6qO59JSw/exec'
  console.log(targetUrl)
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body),
    })

    const text = await response.text()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(text)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
