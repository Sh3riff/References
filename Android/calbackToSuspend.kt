// Original Code structure

fun OriginalCode(image: InputImage) {
  scanner.process(image)
    .addOnSuccessListener {
      barcodes -> // Task completed successfully
    }
    .addOnFailureListener {
      // Task failed with an exception // ... 
    }
}



// Solution 1: Using Task await
import kotlinx.coroutines.tasks.await

suspend fun TaskAwait(image: InputImage): List<Barcode> {
    return scanner.process(image).await()
}



// Solution 2:suspendCancellableCoroutine
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlinx.coroutines.suspendCancellableCoroutine

suspend fun SuspendCancellable(image: InputImage): List<Barcode> =
    suspendCancellableCoroutine { cont ->
        scanner.process(image)
            .addOnSuccessListener { barcodes ->
                cont.resume(barcodes)
            }
            .addOnFailureListener { exception ->
                cont.resumeWithException(exception)
            }
    }
