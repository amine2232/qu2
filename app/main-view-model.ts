import { Observable } from '@nativescript/core';
import { SpeechRecognitionService } from './speech-recognition.service';

export class MainViewModel extends Observable {
  private speechRecognition: SpeechRecognitionService;
  private _isRecording: boolean = false;
  private _recognizedText: string = '';

  constructor() {
    super();
    this.speechRecognition = new SpeechRecognitionService();
  }

  get isRecording(): boolean {
    return this._isRecording;
  }

  set isRecording(value: boolean) {
    if (this._isRecording !== value) {
      this._isRecording = value;
      this.notifyPropertyChange('isRecording', value);
    }
  }

  get recognizedText(): string {
    return this._recognizedText;
  }

  set recognizedText(value: string) {
    if (this._recognizedText !== value) {
      this._recognizedText = value;
      this.notifyPropertyChange('recognizedText', value);
    }
  }

  onPushToTalk() {
    if (this.isRecording) {
      this.speechRecognition.stopListening();
      this.isRecording = false;
    } else {
      this.isRecording = true;
      this.speechRecognition.startListening((text, isFinal) => {
        if (text) {
          this.recognizedText = text;
        }
      });
    }
  }

  cleanup() {
    this.speechRecognition.cleanup();
  }
}