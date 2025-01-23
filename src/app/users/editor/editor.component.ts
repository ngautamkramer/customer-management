import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
declare const fabric: any;
import { ColorSketchModule } from 'ngx-color/sketch';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [ColorSketchModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
  providers: [ApiService]
})
export class EditorComponent implements AfterViewInit {

  //all varibales for editor
  selectedObjectType: string = '';
  selectedObjectColor: string = '';
  selectedObjectBGColor: string = '';
  selectedFontFamily: string = "Open Sans";
  // end all variable for editor
  allFontList: any = [];
  ObjectPropertyVisibleStatus: any = {bold: false, italic: false, underline: false, font_family: false, alignment: false, color: false, bg_color: false, opacity: false, radius: false, delete: false};

  @ViewChild('fabricCanvas', { static: true }) fabricCanvas!: ElementRef<HTMLCanvasElement>;
  private canvas: any;

  constructor(private http: HttpClient, private renderer: Renderer2, private apiService: ApiService) {
  }

  ngAfterViewInit(): void {
    this.initFabricCanvas();
  }

  ngOnInit(): void {
    let fontList = '';
    this.allFontList = this.apiService.loadGoogleFont();
    for (let index = 0; index < this.allFontList.length; index++) {
      fontList += this.allFontList[index] + "|";
    }
    this.loadGoogleFont(fontList);
  }


  loadGoogleFont(fontFamily: string) {
    console.log("Font Family:-", fontFamily);
    let fontUrl = "http://fonts.googleapis.com/css?family=" + fontFamily.replace(" ", "+");
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    this.renderer.appendChild(document.head, link);
  }


  setHighDPI(canvas: any, width: any, height: any) {
    var dpr = window.devicePixelRatio || 1;  // Get device pixel ratio
    canvas.setWidth(width * dpr);
    canvas.setHeight(height * dpr);
    canvas.setZoom(1 / dpr);  // Scale down for correct display size
}


  private initFabricCanvas(): void {

    const canvasElement = this.fabricCanvas.nativeElement;

    this.canvas = new fabric.Canvas(canvasElement, {
      backgroundColor: 'white',
      enableRetinaScaling: true
    });

    this.setHighDPI(this.canvas, 965, 600);  // Set your desired logical canvas size

    /*this.canvas.on('object:moving', (e: any) => {
      const obj = e.target; // The object being moved
      const canvasWidth = this.canvas.width || 0;
      const canvasHeight = this.canvas.height || 0;
      // Ensure the object stays within canvas boundaries
      if (obj.left < 0) {
        obj.left = 0;
      }
      if (obj.top < 0) {
        obj.top = 0;
      }
      if (obj.left + obj.width * obj.scaleX > canvasWidth) {
        obj.left = canvasWidth - obj.width * obj.scaleX;
      }
      if (obj.top + obj.height * obj.scaleY > canvasHeight) {
        obj.top = canvasHeight - obj.height * obj.scaleY;
      }
    });*/

    this.canvas.on('selection:created', () => {
      this.selectedObjectType = this.canvas.getActiveObject().get('type');
      this.objectSelectedEvent(this.selectedObjectType);
    });

    this.canvas.on('selection:updated', () => {
      this.selectedObjectType = this.canvas.getActiveObject().get('type');
      this.objectSelectedEvent(this.selectedObjectType);
    });

    this.canvas.on('selection:cleared', () => {
      console.log('Selection cleared', this.selectedObjectType);
    });

  }

  objectSelectedEvent(objectType: string) {

    console.log(objectType);
    if (objectType == "textbox"){
      this.ObjectPropertyVisibleStatus.bold = false;
      this.ObjectPropertyVisibleStatus.italic = false;
      this.ObjectPropertyVisibleStatus.underline = false;
      this.ObjectPropertyVisibleStatus.font_family = false;
      this.ObjectPropertyVisibleStatus.alignment = false;
      this.ObjectPropertyVisibleStatus.color = false;
      this.ObjectPropertyVisibleStatus.bg_color = false;
      this.ObjectPropertyVisibleStatus.opacity = false;
      this.ObjectPropertyVisibleStatus.radius = true;
    }else if(objectType == "rect" || objectType == "circle"){
      this.ObjectPropertyVisibleStatus.bold = true;
      this.ObjectPropertyVisibleStatus.italic = true;
      this.ObjectPropertyVisibleStatus.underline = true;
      this.ObjectPropertyVisibleStatus.font_family = true;
      this.ObjectPropertyVisibleStatus.alignment = true;
      this.ObjectPropertyVisibleStatus.color = true;
      this.ObjectPropertyVisibleStatus.bg_color = false;
      this.ObjectPropertyVisibleStatus.opacity = false;
      this.ObjectPropertyVisibleStatus.radius = false;
    }
    //this.ObjectPropertyVisibleStatus.delete = false;
  }

  selectFileAndInsert(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Read the file and convert it to a data URL
      reader.onload = (e: any) => {
        const dataURL = e.target.result;

        // Use the data URL as the image source
        fabric.Image.fromURL(dataURL, (img: any) => {
          img.set({
            left: 100,
            top: 100
          });
          // Scale the image to specific dimensions
          img.scaleToWidth(150); // Set width to 300px
          img.scaleToHeight(80); // Set height to 200px
          this.canvas.add(img);
          this.canvas.setActiveObject(img);
        });
      };

      reader.readAsDataURL(file); // Converts the file to a Base64 string
    }

  }

  addObjectOnCanvas(type: string) {
    let object: any;
    if (type == "heading") {

      object = new fabric.Textbox('Heading 1', { fill: 'black', left: 30, top: 30, width: 300, fontSize: 70, fontWeight: 500, objectCaching: false, strokeWidth: 1, strokeUniform: true});

    } else if (type == "pragraph") {

      object = new fabric.Textbox('This is paragraph text', { fill: 'black', left: 50, top: 50, width: 700, fontSize: 70, fontWeight: 500, objectCaching: false, strokeWidth: 1, strokeUniform: true });

    } else if (type == "squre") {

      object = new fabric.Rect({ left: 50, top: 50, fill: '#000000', width: 100, height: 100 });

    } else if (type == "circle") {

      object = new fabric.Circle({ radius: 100, fill: 'green', left: 60, top: 60 });

    } else if (type == "rectanle") {

      object = new fabric.Rect({ left: 60, top: 60, fill: '#000000', width: 150, height: 100 });

    }

    this.canvas.add(object);
    this.canvas.setActiveObject(object);
  }

  changeObjectColor(event: any) {
    this.selectedObjectColor = event.color.hex;
    let object = this.canvas.getActiveObject();
    console.log(object);
    object.set({ fill : event.color.hex });
    this.canvas.renderAll();
  }

  changeObjectBGColor(event: any) {
    this.selectedObjectBGColor = event.color.hex;
    let object = this.canvas.getActiveObject();
    if(object)
    object.set({ backgroundColor : event.color.hex });
    this.canvas.renderAll();
  }

  fontStyle(action: string) {

    let object = this.canvas.getActiveObject();
    if (action == "bold") {

      if (object.fontWeight == 'bold') {
        object.set({ fontWeight: "500" });
      } else {
        object.set({ fontWeight: "bold" });
      }

    } else if (action == "italic") {

      if (object.fontStyle == 'italic') {
        object.set({ fontStyle: "normal" });
      } else {
        object.set({ fontStyle: "italic" });
      }

    } else if (action == "underline") {

      object.set({ underline: !object.underline });

    } else if (action == "left" || action == "right" || action == "center" || action == "justify") {

      object.set({ textAlign: action });

    }

    this.canvas.renderAll();
  }

  objectOpacity(event: any) {
    let object = this.canvas.getActiveObject();
    object.set({ opacity: event.target.value / 100 });
    this.canvas.renderAll();
  }

  fontFamilySelect(fontName: string) {
    this.selectedFontFamily = fontName;
    let object = this.canvas.getActiveObject();
    object.set({ fontFamily: fontName });
    this.canvas.renderAll();
  }

  
  objectBorderRadius(event: any) {
    let object = this.canvas.getActiveObject();
    object.set({ rx: event.target.value * 100 / 100, ry: event.target.value * 100 / 100 });
    this.canvas.renderAll();
  }

  objectDelete(){
    var activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
        activeObjects.forEach((obj: any) => {
          this.canvas.remove(obj);
        });
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
    }
  }


}
