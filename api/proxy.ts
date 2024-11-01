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
    // 构建请求选项
    const options = {
      method: req.method, // 转发请求方法
      headers: req.headers, // 转发请求头
      body: req.body ? JSON.stringify(req.body) : undefined, // 转发请求体
    };

    // 发送请求
    const response = await fetch(targetUrl, options);

    // 获取响应数据
    const responseData = await response.json();

    // 构建响应
    const proxyResponse = new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        ...response.headers,
      },
    });
    showLog && console.log(options, '请求options');

    // 将响应返回给客户端
    return proxyResponse
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
