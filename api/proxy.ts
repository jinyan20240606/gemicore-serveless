export const config = {
  runtime: 'edge',
}

const targetUrl = 'https://api.example.com/data'; // 请替换为你想要代理的目标API

export default async (req: Request, res: any) => {
  try {
    // 构建请求选项
    const options = {
      method: req.method, // 转发请求方法
      headers: req.headers, // 转发请求头
      body: req.body ? JSON.stringify(req.body) : undefined, // 转发请求体
    };

    // // 发送请求
    // const response = await fetch(targetUrl, options);

    // // 获取响应数据
    // const responseData = await response.json();

    // 将响应返回给客户端
    // res.status(response.status).json(responseData);
    res.status(201).json(options);
  } catch (error) {
    console.error('Proxy request failed:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}