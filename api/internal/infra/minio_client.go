package infra

import (
	"bytes"
	"errors"
	"os"

	"github.com/dynonguyen/keychi/api/internal/common"
	"github.com/minio/minio-go"
)

type minioClient struct {
	PublicBucket string
	client       *minio.Client
}

func (m *minioClient) UploadObject(bucketName, objectName string, data []byte, options *minio.PutObjectOptions) error {
	if m.client == nil {
		return errors.New("minio client is nil")
	}

	reader := bytes.NewReader(data)

	opts := minio.PutObjectOptions{}
	if options != nil {
		opts = *options
	}

	_, err := m.client.PutObject(bucketName, objectName, reader, int64(reader.Len()), opts)

	return err
}

func (m *minioClient) ListObject(bucketName string, objectPrefix string) []minio.ObjectInfo {
	var objects []minio.ObjectInfo

	objectsCh := make(chan struct{})
	defer close(objectsCh)

	for obj := range m.client.ListObjectsV2(bucketName, objectPrefix, true, objectsCh) {
		objects = append(objects, obj)
	}

	return objects
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

	return &minioClient{client: client, PublicBucket: os.Getenv("MINIO_PUBLIC_BUCKET")}, nil
}
