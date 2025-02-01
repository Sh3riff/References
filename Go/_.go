package routerwebhooks

import (
	"bytes"
	"io"
	"kwilax-hq/kwilax-core/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Process(){}

//  NOTE: webhook urls are intentionally made to be env variables for security of the paths
func WebhookRouter(r *gin.Engine)  {
	webhookRoutes := r.Group("/webhooks")
	{
		webhookRoutes.POST("hello", func(c *gin.Context){
			go func() {
				// Stringify Request body for logging
				bodyBytes, _ := c.Get("bodyBytes")
				// webhookBody := string(bodyBytes)
				webhookBody := string(bodyBytes.([]byte))
				
				// get info
				var body smileidentity.WebhookPayload
				c.ShouldBindJSON(&body)
				Process(body, webhookBody)
			
			}()
		})
	}
}

func webhookResponseMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		bodyBytes, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.JSON(400, gin.H{"error": "Unable to read webhook body"})
			c.Abort()
			return
		}

		// Save the body for future handlers and restore it later
		c.Set("bodyBytes", bodyBytes)
		// Restore Request Body
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
		c.JSON(200, gin.H{})

		// Continue to the next handler
		c.Next()
	}
}
