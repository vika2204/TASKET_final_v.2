import {Editor} from "@tinymce/tinymce-react";

export function RichEditor({state, setState}: {state: string, setState: (content: string) => void}) {
    return (
        <>
            <Editor
                tinymceScriptSrc='/tinymce/tinymce.min.js'
                licenseKey='gpl'
                value={state}
                onEditorChange={(content) => setState(content)}
                init={{
                    statusbar: false,
                    language_url: "/ru.js",
                    language: 'ru',
                    height: 250,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'table', 'preview', 'codesample'
                    ],
                    toolbar:
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | codesample | ' +
                        'removeformat',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}
