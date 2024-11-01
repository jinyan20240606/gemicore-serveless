export const config = {
  runtime: "edge",
};

export default async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const targetUrl = searchParams.get('r')
    const showLog = searchParams.get('log')
    if (!targetUrl) {
      return new Response('No target URL provided', { status: 400 })
    }
    // 获取请求头
    const headers = req.headers;
    const headersObject = {};

    headers.forEach((value, key) => {
      headersObject[key] = value;
    });

    let requestBody;
    if (req.method === 'POST') {
      requestBody = await req.text();
    }
    // 构建请求选项
    const options = {
      method: req.method, // 转发请求方法
      headers: headersObject, // 转发请求头
      body: requestBody, // 转发请求体
    };

    showLog && console.log(options, '请求options');
    // 发送请求
    return fetch(targetUrl, options);
  } catch (error) {
    console.error("Proxy request failed:", error);
    const errorResponse = new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return errorResponse;
  }
};
