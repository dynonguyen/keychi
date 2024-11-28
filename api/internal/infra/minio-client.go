package infra

import (
	"bytes"
	"errors"
	"os"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/minio/minio-go"
)

type minioClient struct {
	publicBucket string
	client       *minio.Client
}

func (m *minioClient) UploadObject(bucketName, objectName string, data []byte, options *minio.PutObjectOptions) error {
	if m.client == nil {
		return errors.New("minio client is nil")
	}

	reader := bytes.NewReader(data)

	_, err := m.client.PutObject(bucketName, objectName, reader, int64(reader.Len()), minio.PutObjectOptions{})

	return err
}

func NewMinioClient() (*minioClient, error) {
	useSSL := os.Getenv("ENV_MODE") == string(common.EnvProd)
	endpoint := os.Getenv("MINIO_ENDPOINT")
	accessKeyID := os.Getenv("MINIO_ACCESS_KEY")
	secretAccessKey := os.Getenv("MINIO_SECRET_KEY")

	client, err := minio.New(endpoint, accessKeyID, secretAccessKey, useSSL)

	if err != nil {
		return nil, err
	}

	return &minioClient{client: client, publicBucket: os.Getenv("MINIO_PUBLIC_BUCKET")}, nil
}
