export default `{
            test: /\\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
            use: [
              'cache-loader',
              'thread-loader',
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
          },`;
