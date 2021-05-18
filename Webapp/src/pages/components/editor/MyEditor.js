import * as React from "react";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
const {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontSize,
    FontName,
    FormatBlock,
    Link,
    Unlink,
    InsertImage,
    ViewHtml,
    InsertTable,
    AddRowBefore,
    AddRowAfter,
    AddColumnBefore,
    AddColumnAfter,
    DeleteRow,
    DeleteColumn,
    DeleteTable,
    MergeCells,
    SplitCell,
} = EditorTools;

class MyEditor extends React.Component {
    handlerChange(event){
        console.log(event.value.content)
    }
    render() {
        return (
            <div>
            <Editor
                tools={[
                    [Bold, Italic, Underline, Strikethrough],
                    [Subscript, Superscript],
                    [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                    [Indent, Outdent],
                    [OrderedList, UnorderedList],
                    [Link, Unlink, InsertImage, ViewHtml],
                    [Undo, Redo],
                    [FontSize,
                    FontName,
                    FormatBlock],
                    [InsertTable],
                    [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                    [DeleteRow, DeleteColumn, DeleteTable],
                    [MergeCells, SplitCell],
                ]}
                contentStyle={{
                    height: window.innerHeight / (2.4),
                }}
                defaultContent={""}
                onChange={this.handlerChange}
            />
            <div style={{marginBottom:"50px"}} />
            </div>
        );
    }
}
export default MyEditor;