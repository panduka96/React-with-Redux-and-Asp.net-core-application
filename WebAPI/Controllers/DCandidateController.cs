using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCandidateController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public DCandidateController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/DCandidate
        [HttpGet]
        public IEnumerable<DCandidate> GetDCandidates()
        {
            return _context.DCandidates;
        }

        // GET: api/DCandidate/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDCandidate([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dCandidate = await _context.DCandidates.FindAsync(id);

            if (dCandidate == null)
            {
                return NotFound();
            }

            return Ok(dCandidate);
        }

        // PUT: api/DCandidate/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDCandidate([FromRoute] int id, [FromBody] DCandidate dCandidate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dCandidate.Id = id;

            _context.Entry(dCandidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException )
            {
                if (!DCandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DCandidate
        [HttpPost]
        public async Task<IActionResult> PostDCandidate([FromBody] DCandidate dCandidate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DCandidates.Add(dCandidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDCandidate", new { id = dCandidate.Id }, dCandidate);

            //return Ok(dCandidate);
        }

        // DELETE: api/DCandidate/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDCandidate([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dCandidate = await _context.DCandidates.FindAsync(id);
            if (dCandidate == null)
            {
                return NotFound();
            }

            _context.DCandidates.Remove(dCandidate);
            await _context.SaveChangesAsync();

            return Ok(dCandidate);
        }

        private bool DCandidateExists(int id)
        {
            return _context.DCandidates.Any(e => e.Id == id);
        }
    }
}