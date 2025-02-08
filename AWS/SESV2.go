package utils

import (
	"context"
	"encoding/json"
	"log/slog"

	// "html/template"
	"regexp"

	// "log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/sesv2"
	"github.com/aws/aws-sdk-go-v2/service/sesv2/types"
)

var mailClient *sesv2.Client

func LoadSESCredentials() {
  accessKey := Env.AWS_ACCESS_KEY 
  secretKey := Env.AWS_SECRET_KEY
  region := "us-east-1"

  amazonConfiguration, configurationError :=
    config.LoadDefaultConfig(
      context.Background(),
      config.WithRegion(region),
      config.WithCredentialsProvider(
        credentials.NewStaticCredentialsProvider(
          accessKey, secretKey, "",
        ),
      ),
    )

  if configurationError != nil {
    slog.Error("SES Config Error" + configurationError.Error())
  }

  mailClient = sesv2.NewFromConfig(amazonConfiguration)
}

type email struct {}

func (e email) PopulateEmailHTMLVariables(template string, replacements map[string]string) string {
	// Regex to match placeholders like {{Name}}
    re := regexp.MustCompile(`{{\s*(\w+)\s*}}`)

	// Replace each placeholder with the corresponding value
    result := re.ReplaceAllStringFunc(template, func(match string) string {
        key := re.FindStringSubmatch(match)[1] // Get the variable name
        if val, exists := replacements[key]; exists {
            return val // Return the replacement value if exists
        }
        return match // If no replacement found, return the original placeholder
    })

	return result
}

type SendEmailType struct {
	Subject 	string
	BodyHTML    string
	BodyText    string
}
func (e email) Send(payload SendEmailType, to []string) {
	charset := aws.String("UTF-8")
	mail := &sesv2.SendEmailInput{
	  FromEmailAddress: aws.String(Env.EMAIL_SENDER),
	  Destination: &types.Destination{
      ToAddresses: to,
	  },
	  Content: &types.EmailContent{
      Simple: &types.Message{
        Subject: &types.Content{
        Charset: charset,
        Data: aws.String(payload.Subject),
        },
        Body: &types.Body{
          Text: &types.Content{
            Charset: charset,
            Data: aws.String(payload.BodyText),
          },
          Html: &types.Content{
            Charset: charset,
            Data: aws.String(payload.BodyHTML),
          },
        },
      },
	  },
	}
  
	_, createMailError := mailClient.SendEmail(context.Background(), mail)
  
	if createMailError != nil {
    slog.Error("Email Send Error " + createMailError.Error())
	  // log error
	} else {
    slog.Info("Email Sent")
  }
}

func (e email) SendTemplate(templateName string, recepient string, payload map[string]string) {
  // Normalize payload format i.e Convert map to JSON string
	templateData, err := json.Marshal(payload)
  if err != nil {
    slog.Error("failed to marshal template data: " + err.Error())
    return
	}
	mail := &sesv2.SendEmailInput{
	  FromEmailAddress: aws.String(Env.EMAIL_SENDER),
	  Destination: &types.Destination{
      ToAddresses: []string{recepient},
	  },
	  Content: &types.EmailContent{
      Template: &types.Template{
        TemplateName: aws.String(templateName),
        TemplateData: aws.String(string(templateData)),
      },
	  },
	}

  _, createMailError := mailClient.SendEmail(context.Background(), mail)
  
	if createMailError != nil {
    slog.Error("Email Send Error " + createMailError.Error())
	  // log error
	} else {
    slog.Info("Email Sent")
  }
}
