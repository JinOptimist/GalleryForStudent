using System.IO;

namespace GalleryForStudent.Models
{
    public class Image
    {
        public string Url { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public int Star { get; set; } = 0;
    }
}