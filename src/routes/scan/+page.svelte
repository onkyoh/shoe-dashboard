<!-- BarcodeReader.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import Quagga from 'quagga';
  
    let imageSrc;
  
    async function detectBarcode(imageUrl) {
      Quagga.decodeSingle(
        {
          src: imageUrl,
          numOfWorkers: 0, // You can adjust the number of workers as needed
          locate: true, // Enable locating the barcode position
          decoder: {
            readers: ['ean_reader', 'code_128_reader', 'code_39_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
          }
        },
        result => {
          if (result && result.codeResult) {
            console.log('Barcode detected:', result.codeResult.code);
            // Handle the detected barcode here
          } else {
            console.log('No barcode detected');
          }
        }
      );
    }
  
    async function captureImageFromCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      video.srcObject = stream;
      await video.play();
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const imageUrl = canvas.toDataURL('image/png');
      imageSrc = imageUrl;
  
      await detectBarcode(imageUrl);
  
      video.srcObject.getTracks().forEach(track => track.stop());
    }
  </script>
  
  <div>

    <button on:click={captureImageFromCamera}>Capture Image from Camera</button>
    {#if imageSrc}
      <img src={imageSrc} alt="Barcode Image" />
    {/if}
  </div>
  