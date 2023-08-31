// External Dependencies
import textToSpeech from '@google-cloud/text-to-speech'
import { AudioContext } from 'web-audio-engine'

// Internal Dependencies
import { GOOGLE_CREDENTIALS, S3, S3_FOLDER_PODCAST, secondsToHms } from '@/lib'

/**
 *
 * @param title The title of the podcast
 * @param text The text to be converted to speech
 * @returns The link to the podcast and its duration (format: 00:00:00, for podcast xml)
 * @description This function uses Google Cloud Text-to-Speech to convert text to speech and then uploads the audio file to S3
 */
export async function createPodcast(
  title: string,
  text: string
): Promise<{ link: string; duration: string }> {
  const credentials = JSON.parse(GOOGLE_CREDENTIALS)

  // Audio generation -----------------------------------
  const client = new textToSpeech.TextToSpeechClient({
    credentials,
  })

  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  })

  if (!response.audioContent) throw new Error('No audio content')

  // Upload to S3 ---------------------------------------
  const s3 = new S3()
  const link = await s3.sendMedia({
    folder: S3_FOLDER_PODCAST,
    body: response.audioContent,
    fileName: title,
    tag: 'podcast',
    ext: 'mp3',
  })

  // Get duration ---------------------------------------
  const audioCtx = new AudioContext()

  const responseForDuration = await fetch(link)
  if (!responseForDuration.ok) throw new Error('No response for duration')

  const audioBuffer = await responseForDuration.arrayBuffer()

  const duration: string = await new Promise((resolve, _reject) => {
    audioCtx.decodeAudioData(audioBuffer, (buffer: any) => {
      // Get the duration in seconds
      const duration = secondsToHms(buffer.duration)
      resolve(duration)
    })
  })

  // Return ---------------------------------------------

  return { link, duration }
}
