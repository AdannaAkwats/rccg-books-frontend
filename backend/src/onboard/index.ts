import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';

const s3 = new S3Client({});

interface OnboardEvent {
  bookId?: string;
  file?: string;
  [key: string]: unknown;
}

export const handler = async (event: OnboardEvent) => {
  const bookId = event?.bookId;
  const file = event?.file;

  if (!bookId || !file) {
    console.log('Missing bookId or file in event', event);
    return {
      statusCode: 400,
      body: 'Missing bookId or file',
    };
  }

  const key = `INPUT/${bookId}/${file}`;
  console.log('Reading S3 object', key);

  try {
    const result = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.ONBOARDED_BUCKET as string,
        Key: key,
      })
    );

    const body = await streamToString(result.Body);
    console.log('File content:', body);

    return {
      statusCode: 200,
      body,
    };
  } catch (error) {
    console.log('Failed to read object', error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

async function streamToString(stream: any): Promise<string> {
  if (!stream) return '';
  if (typeof stream === 'string') return stream;
  if (stream instanceof Uint8Array) {
    return new TextDecoder().decode(stream);
  }

  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString('utf-8');
}

